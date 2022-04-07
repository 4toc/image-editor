# image-editor

This is image-editor where you can change brightness and contrast

Instead of `<input type="range">` I created a special component ControlInputRange.vue for better styling in different browsers.
In ImagePreview.vue I change brightness and contrast.  I do it in one function because it helps to combine all effects. I'm manipulating pixels relative to relative to the original image.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Show app after build

```sh
npm run preview
```
