import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { HttpModule } from '@angular/http';
import { PostProvider } from '../providers/post-provider';
import { EmailComposer } from '@ionic-native/email-composer'
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { HttpBackend, HttpXhrBackend } from '@angular/common/http';
import { NativeHttpModule, NativeHttpBackend, NativeHttpFallback } from 'ionic-native-http-connection-backend';
import { Platform } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { File } from '@ionic-native/file';
import { MediaCapture } from '@ionic-native/media-capture';
import { Media } from '@ionic-native/media';
import { IonicStorageModule } from '@ionic/Storage'
import { VideoPlayer } from '@ionic-native/video-player/';
import { StreamingMedia } from '@ionic-native/streaming-media'
import { VideoEditor } from '@ionic-native/video-editor';
import { FileChooser } from '@ionic-native/file-chooser'
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer}  from '@ionic-native/file-transfer';
import { NativeAudio } from '@ionic-native/native-audio';
import { DocumentPicker } from '@ionic-native/document-picker';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Base64 } from '@ionic-native/base64';
import { Chooser } from '@ionic-native/chooser';
import { FileOpener } from '@ionic-native/file-opener';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { MyApp } from './app.component';
import { ModulevariablesProvider } from '../providers/modulevariables/modulevariables';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Downloader } from '@ionic-native/downloader';
import { HTTP } from '@ionic-native/http';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NativeHttpModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    Camera,
    InAppBrowser,
    FileOpener,
    Chooser,
    Base64,
    DocumentPicker,
    FileTransfer,
    FileChooser,
    DocumentViewer,
    FilePath,
    EmailComposer,
    CallNumber,
    WebView,
    VideoPlayer,
    PhotoViewer,
    NativeAudio,
    LocalNotifications,
    StreamingMedia,
    VideoEditor,
    File,
    Media,
    MediaCapture,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {provide: HttpBackend, useClass: NativeHttpFallback, deps: [Platform, NativeHttpBackend, HttpXhrBackend]},
    ModulevariablesProvider,
    PostProvider,
    Downloader,
    HTTP
  ]
})
export class AppModule { }
