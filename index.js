const { unlinkSync } = require('fs');
const axios = require('axios').default;
const serverUrl = 'http://localhost:5000/ia/detect/bl.jpg';
const controllerUrl = 'http://localhost:5000/ia/detect/bl.jpg';
const sended = false;

async function execute1() {
  while (true) {
    if (!sended) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const { status, data } = await axios.get(serverUrl);
        if (status == 200) {
          const { data } = await axios.get(`${controllerUrl}?data=${data}`);
          if (data === 'success') {
            sended = false;
          }
        }
      } catch (error) {
        sended = false;
        console.log(error);
      }
    }
  }
}

execute1();
