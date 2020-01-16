import { Component, OnInit, ViewChild } from '@angular/core';
import { BrowserQRCodeReader, VideoInputDevice } from '@zxing/library';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit {
  // @ViewChild('#scanner', { static: false })
  scanner: BrowserQRCodeReader;
  selectedDevice: VideoInputDevice;

  videoDeviceNotFound = false;
  scannerHidden = true;
  payload = '';
  checked = false;

  constructor() {
    this.scanner = new BrowserQRCodeReader();
    console.log('Scanner initialized: ', this.scanner);
  }

  ngOnInit() {
    this.scanner.getVideoInputDevices()
      .then((videoInputDevices: VideoInputDevice[]) => {
        if (videoInputDevices.length > 0) {
          this.selectedDevice = videoInputDevices[0];
          console.info('Video devices found.', videoInputDevices);
          this.videoDeviceNotFound = false;
        } else {
          this.selectedDevice = null;
          console.error('Video device not found.');
          this.videoDeviceNotFound = true;
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  onScan(event) {
    console.log('Scan initiated:', event);
    console.info('scanner: ', this.scanner);
    this.scannerHidden = false;
    this.scanner.decodeFromInputVideoDevice(this.selectedDevice.deviceId, 'video')
      .then(result => {
        console.log(result.getText());
        this.payload = result.getText();
        this.scannerHidden = true;
        this.scanner.reset();
      })
      .catch(error => {
        console.error(error);
        this.payload = '';
      });
  }

  // toggleCamera(event?: any) {
  //   console.log(event);
  //   this.checked = event.checked;
  // }

  // camerasFoundHandler(event) {
  //   console.log('camerasFound', event);
  // }
  // camerasNotFoundHandler(event) {
  //   console.log('camerasNotFound', event);
  // }
  // scanSuccessHandler(event) {
  //   console.log('scanSuccess', event);
  //   this.payload = event;
  // }
  // scanErrorHandler(event) {
  //   console.log('scanError', event);
  // }

}
