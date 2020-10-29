import app from 'main/App';
import "dotenv/config"

const port = `${process.env.PORT}` || 3000

app.listen(port, () => {
    console.log('Server ON');
});
