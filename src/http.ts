import axios from 'axios';

class HTTPClient {
  host: string;
  port: number;
  https: boolean;
  url: string;

  constructor(host: string, port: number, https: boolean) {
    this.host = host;
    this.port = port;
    this.https = https;
    this.url = this.https ? `https://${this.host}:${this.port}` : `http://${this.host}:${this.port}`;
  }

  public async start(): Promise<boolean> {
    let path = '/__ping__';
    try {
      let response = await axios.get(`${this.url}${path}`);
      return response.status === 200;
    } catch (error) {
      throw error;
    }
  }

  public async write(name: string, data: string): Promise<boolean> {
    let path = `/write`;
    try {
      let response = await axios.post(`${this.url}${path}`, { name, data });
      return response.status === 200;
    } catch (error) {
      throw error;
    }
  }

  public async read(name: string): Promise<string> {
    let path = `/read/${name}`;
    try {
      let response = await axios.get(`${this.url}${path}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async delete(name: string): Promise<boolean> {
    let path = `/delete/${name}`;
    try {
      let response = await axios.delete(`${this.url}${path}`);
      return response.status === 200;
    } catch (error) {
      throw error;
    }
  }
}

export default HTTPClient;