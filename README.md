# ws-relay

This small program reads MJPEG or PNG data from `stdin` and streams it over WebSocket. This is intended to be used in conjunction with FFmpeg and [the detector](https://github.com/DFEC-cUAS/detector).

I did not write this program. I only made a minor modification to allow it to work for this project's purposes.

The [`index.html`](/index.html) and [`main.js`](/main.js) files are not actually needed for this to work.

## Project Notes
The compiled executable is already on the laptop. The [`camera_stream.sh` script](https://github.com/DFEC-cUAS/cuas_main/blob/main/scripts/camera_stream.sh) takes care of running it for you.

## Build
To build this program, you must have Golang installed.

From inside the repository directory, do:  
`go build -o ws-relay ws-relay.go`

Once built, the executable is statically-linked and does not require any libraries to be installed to run.

## Usage
Stream file over WebSocket as PNG:  
```
ffmpeg -re -i input.mp4 -c:v png -f image2pipe - | ./ws-relay -l :8080 -s png
```

Stream file over WebSocket as JPEG:  
```
ffmpeg -re -i input.mp4 -c:v mjpeg -qscale:v 2 -f image2pipe - | ./ws-relay -l :8080
```
  * `-qscale:v 2`: JPEG quality, ranges from 31 (worst) down to 2 (best)


