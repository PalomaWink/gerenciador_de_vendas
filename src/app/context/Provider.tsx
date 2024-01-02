import Context from "./Context";

export default function Provider({ children }: any) {
  const value = {};
  
  return (
    <Context.Provider value={ value }>
      {children}
    </Context.Provider>
  )
}