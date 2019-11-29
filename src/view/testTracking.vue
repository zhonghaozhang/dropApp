<template>
  <div class="testTracking">
    <div style="position:relative">
      <video style="position: absolute;z-index: 1;left: 0;" id="video" autoplay width="300px" height="300px"></video>
      <canvas style="position: absolute;z-index: 2;left: 0"id="canvas" width="300px" height="300px"></canvas>
      <canvas id="canvas2" style="position: absolute;z-index: 2;top: 300px;left: 0" width="300px" height="300px"></canvas>
    </div>
  </div>
</template>

<script>
  export default {
    name:'testTracking',
    data(){
      return {
        tracker:{}
      }
    },
    mounted(){
      this.openCamera()
    },
    methods:{
      openCamera () {
        const initface = ()=>{
          const video = document.getElementById('video');
          const canvas = document.getElementById('canvas');
          const canvas2 = document.getElementById('canvas2');
          const context = canvas.getContext('2d');
          const context2 = canvas2.getContext('2d');

          const tracker = new tracking.ObjectTracker('face');
          tracker.setInitialScale(4);
          tracker.setStepSize(1);
          tracker.setEdgesDensity(0.1);

          tracking.track('#video', tracker, { camera: true });

          tracker.on('track', (event) => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            event.data.forEach((rect) => {
              context.strokeStyle = '#10ff87';
              context.strokeRect(rect.x, rect.y, rect.width, rect.height);
              context.font = '11px Helvetica';
              context.fillStyle = "#fff";
              context.fillText("x:" + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
              context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
            });

            context2.drawImage(video, 0, 0, 200, 150);
            const snapData = canvas2.toDataURL('image/png');
            const imgSrc = "data:image/png;" + snapData;
// this.setState({ currentBase64: imgSrc });
          });
        }
        initface()
      },
      submit () {
        let that = this
        let canvas = document.getElementById('canvas')
        let context = canvas.getContext('2d')
        let video = document.getElementById('video')
        context.drawImage(video, 0,0, 500, 400)
        canvas.toBlob((blob) => {
          console.log(blob)
          console.log(URL.createObjectURL(blob))
          window.open(URL.createObjectURL(blob))
          // axios.post({faceUrl: URL.createObjectURL(blob)})
          //   .then((res) => {
          //     console.log('上传成功')
          //   })
        })
      }
    },
    destroyed () {
      // // 停止侦测
      // this.trackerTask.stop()
      // // 关闭摄像头
      // this.trackerTask.closeCamera()
    }
  }

</script>

<style lang="scss" scoped>
  .testTracking {
    height: 100vh;
    width: 100%;
    position: relative;
    > * {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
    }
    video, canvas {
      top: 0;
    }
    .buttonDiv {
      bottom: 10px;
    }
  }

</style>
