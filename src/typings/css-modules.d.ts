declare module '*.module.css' {
  declare const CSSModule: {
    [key in string]: string;
  };

  export default CSSModule;
}
