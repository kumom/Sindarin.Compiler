// https://nodejs.org/api/net.html#net_net_createserver_options_connectionlistener
import net from 'net';
const port = 4400;
const server = net.createServer((c) => {
  // 'connection' listener.
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.write('hello\r\n');
  c.pipe(c);
});
server.on('error', (err) => {
  throw err;
});
server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
