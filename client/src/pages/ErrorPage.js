import { useRouteError } from "react-router-dom";

function ErrorPage(){
    
    const error = useRouteError();

    return (
        <div>
            <h1>Woops! Something went wrong!</h1>
        </div>
    )
}

export default ErrorPage;