import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BrowserQRCodeReader, VideoInputDevice } from '@zxing/library';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css']
})
export class QrScannerComponent implements OnInit {
  @Output()
  scannedEvent = new EventEmitter<string>();
  @Output()
  scanningErrorEvent = new EventEmitter<Error>();
  @Output()
  resetEvent = new EventEmitter<void>();

  payload = '';

  scanner: BrowserQRCodeReader;
  selectedDevice: VideoInputDevice;
  availableDevices: VideoInputDevice[];

  videoDeviceNotFound = false;
  scannerHidden = true;
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
      alert('No video device available.');
      this.scanningErrorEvent.emit(new Error('No video device available.'));
      return;
    }
    this.scannerHidden = false;
    this.scanner.decodeFromInputVideoDevice(this.selectedDevice.deviceId, 'video')
      .then(result => {
        console.log(result.getText());
        this.payload = result.getText();
        this.scannerHidden = true;
        this.scanner.reset();
        this.scannedEvent.emit(this.payload);
      })
      .catch(error => {
        console.error(error);
        this.payload = '';
        this.scanningErrorEvent.emit(error);
      });
  }

  onScanReset() {
    console.log('Scan reset initiated');
    this.scanner.reset();
    this.payload = '';
    this.scannerHidden = true;
    this.resetEvent.emit();
  }


}
