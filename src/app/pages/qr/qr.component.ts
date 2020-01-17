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
  availableDevices: VideoInputDevice[];

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
          this.availableDevices = videoInputDevices;
          this.selectedDevice = videoInputDevices[0];
          console.info('Video devices found.', videoInputDevices);
          this.videoDeviceNotFound = false;
        } else {
          this.availableDevices = null;
          this.selectedDevice = null;
          console.error('Video device not found.');
          this.videoDeviceNotFound = true;
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  onScan() {
    console.log('Scan initiated');
    if (!this.selectedDevice) {
      alert("No video device available or selected.");
      return;
    }
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

  onScanReset() {
    console.log('Scan reset initiated');
    this.scanner.reset();
    this.payload = '';
    this.scannerHidden = true;
  }

  // onLoadImage() {

  // }
}
