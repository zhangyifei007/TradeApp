import { app } from './app';

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  // tslint:disable-next-line: no-console
  console.log(`App listening on port ${PORT}!`);
});
app.on('error', console.log);