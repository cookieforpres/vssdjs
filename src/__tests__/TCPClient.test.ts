import TCPClient from '../tcp';

describe('TCPClient', () => {
  it('should be able to connect to a TCP server', async () => {
    const client = new TCPClient('localhost', 1337);
    const result = await client.start();
    expect(result).toBe(true);
  });

  it('should be able to write to a TCP server', async () => {
    const client = new TCPClient('localhost', 1337);
    const result = await client.write('test', 'test');
    expect(result).toBe(true);
  });

  it('should be able to read from a TCP server', async () => {
    const client = new TCPClient('localhost', 1337);
    const result = await client.read('test');
    expect(result).toBe('test');
  });

  it('should be able to delete from a TCP server', async () => {
    const client = new TCPClient('localhost', 1337);
    const result = await client.delete('test');
    expect(result).toBe(true);
  });

  it('should fail to read from a TCP server', async () => {
    const client = new TCPClient('localhost', 1337);
    try {
      const result = await client.read('test');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});