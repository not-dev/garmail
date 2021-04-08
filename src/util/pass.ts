const unusedVars = (...vars:any[]):void => {
  ((_:any, undef?:undefined) => undef)(vars)
}

export { unusedVars }
