export class GiphyFetch {
  apiKey: string;
  baseUrl: string = "https://api.giphy.com/v1";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.testKey().then((data) => this.checkRequest(data.meta));
  }

  private checkRequest(meta: any) {
    if (meta.status === 400) {
      throw new Error("Your request was formatted incorrectly or missing a required parameter(s).");
    }
    if (meta.status === 401) {
      throw new Error("Your request lacks valid authentication credentials for the target resource, which most likely indicates an issue with your API Key or the API Key is missing.");
    }
    if (meta.status === 403) {
      throw new Error("You weren't authorized to make your request; most likely this indicates an issue with your API Key.");
    }
    if (meta.status === 404) {
      throw new Error("The particular GIF or Sticker you are requesting was not found. This occurs, for example, if you request a GIF by using an id that does not exist.");
    }
    if (meta.status === 414) {
      throw new Error("The length of the search query exceeds 50 characters.");
    }
    if (meta.status === 429) {
      throw new Error("Your API Key is making too many requests. Read about requesting a Production Key to upgrade your API Key rate limits.");
    }
  }

  private async testKey() {
    return await this.random();
  }

  public async random(): Promise<any> {
    const rating = "g";
    const tag = "hugs";
    return (await fetch(`${this.baseUrl}/gifs/random?api_key=${this.apiKey}&tag=${tag}&rating=${rating}`)).json();
  }
}
