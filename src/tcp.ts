import { Socket } from 'net';

class TCPClient {
  host: string;
  port: number;

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
  }

  public async start(): Promise<boolean> {
    const socket = new Socket();
    return new Promise((resolve, reject) => {
      socket.on('connect', () => {
        socket.end();
        resolve(true);
      });

      socket.on('error', (error) => {
        reject(error);
      });

      socket.connect(this.port, this.host);
    });
  }

  public async write(name: string, data: string): Promise<boolean> {
    const initJson = JSON.stringify({ action: 'write', name, size: data.length });
    const initBuffer = Buffer.from(initJson, 'utf8');
    const dataBuffer = Buffer.from(data, 'utf8');
    const socket = new Socket();
    return new Promise((resolve, reject) => {
      socket.on('connect', () => {
        socket.write(initBuffer);
        setTimeout(() => {
          socket.write(dataBuffer);
        }, 1000);
      });

      socket.on('data', (res) => {
        const response = JSON.parse(res.toString());
        if (!response.error) {
          socket.end();
          resolve(true);
        } else {
          reject(response.error);
        }
      });

      socket.on('error', (error) => {
        reject(error);
      });

      socket.connect(this.port, this.host);
    });
  }

  public async read(name: string): Promise<string> {
    const initJson = JSON.stringify({ action: 'read', name });
    const initBuffer = Buffer.from(initJson, 'utf8');
    const socket = new Socket();
    return new Promise((resolve, reject) => {
      socket.on('connect', () => {
        socket.write(initBuffer);
      });

      socket.on('data', (data) => {
        try {
          const response = JSON.parse(data.toString());
          if (!response.error) {
            socket.end();
            resolve(response.data);
          } else {
            reject(response.error);
          }
        } catch (error) {
          socket.end();
          resolve(data.toString());
        }
      });

      socket.on('error', (error) => {
        reject(error);
      });

      socket.connect(this.port, this.host);
    });
  }

  public async delete(name: string): Promise<boolean> {
    const initJson = JSON.stringify({ action: 'delete', name });
    const initBuffer = Buffer.from(initJson, 'utf8');
    const socket = new Socket();
    return new Promise((resolve, reject) => {
      socket.on('connect', () => {
        socket.write(initBuffer);
      });

      socket.on('data', (data) => {
        const response = JSON.parse(data.toString());
        if (!response.error) {
          socket.end();
          resolve(true);
        } else {
          reject(response.error);
        }
      });

      socket.on('error', (error) => {
        reject(error);
      });

      socket.connect(this.port, this.host);
    });
  }
}

export default TCPClient;
