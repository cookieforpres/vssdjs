import HttpClient from '../http';

describe('HttpClient', () => {
  it('should ping server', async () => {
    const client = new HttpClient('localhost', 8080, false);
    const result = await client.start();
    expect(result).toBe(true);
  });

  it('should write to server', async () => {
    const client = new HttpClient('localhost', 8080, false);
    const result = await client.write('test', 'test');
    expect(result).toBe(true);
  });

  it('should read from server', async () => {
    const client = new HttpClient('localhost', 8080, false);
    const result = await client.read('test');
    expect(result).toBe('test');
  });

  it('should delete from server', async () => {
    const client = new HttpClient('localhost', 8080, false);
    const result = await client.delete('test');
    expect(result).toBe(true);
  });

  it('should fail to read from server', async () => {
    const client = new HttpClient('localhost', 8080, false);
    try {
      await client.read('test');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
