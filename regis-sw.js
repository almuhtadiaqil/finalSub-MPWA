//Periksa Service Worker
if(! ("serviceWorker" in navigator)) {
  console.log("Service worker tidak didukung di browser ini.");
} 
else {
    registerServiceWorker();
    requestPermission();
  }
// REGISTER SERVICE WORKER
function registerServiceWorker () {
  return navigator.serviceWorker.register("service-worker.js")
  .then(registration => {
      console.log("Registrasi service worker berhasil");
      return registration;
  })
  .catch(err => {
      console.log("Registrasi service worker gagal.", err);
  });
}
//Request Permission
function requestPermission(){
  if('Notification' in window) {
    Notification.requestPermission().then(function (result) {
      if (result === "denied"){
        console.log("Fitur notifikasi tidak diijinkan.");
        return;
      }
      else if(result === "default"){
        console.error("Pengguna menutup kotak dialog permintaan ijin.");
        return;
      }
      if(('PushManager' in window)){
        navigator.serviceWorker.getRegistration().then(function (registration) {
          registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey:urlBase64ToUint8Array("BEj01cYxb5_aL7yLQhibvk9FfJlJqm2K-SvaUGeYmCgy1LmxJ4ol8ubgVU5hjSovWlPuYuHePHZQwSBqVbVTTVU")
          })
          .then(subscribe=> {
            console.log('Berhasil melakukan subscribe dengan endpoint:', subscribe.endpoint);
            console.log('Berhasil melakukan subscribe dengan p256dh key', btoa(String.fromCharCode.apply(
            null, new Uint8Array(subscribe.getKey('p256dh')))));
            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
            null, new Uint8Array(subscribe.getKey('auth')))));
          })
          .catch(e=>{
            console.error('Tidak dapat melakukan subcsribe', e.message);
          });
        });
      }
    })
  }
}
function urlBase64ToUint8Array(base64String){
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
  .replace(/-/g, '+')
  .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for(let i = 0; i < rawData.length; ++i){
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}