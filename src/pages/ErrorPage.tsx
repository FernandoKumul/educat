const ErrorPage = () => {

  return (
    <div className="flex flex-grow justify-center items-center flex-col min-h-screen">
      <h1>Oops!</h1>
      <p className="mb-2">{"No se encontró la página solicitada (っ °Д °;)っ."}</p>
      <img className="w-1/3" src="https://cataas.com/cat?tags=scared,nice&width=400" alt="cataas-img" />
    </div>
  );
}
 
export default ErrorPage;