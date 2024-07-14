import { useRouteError } from "react-router-dom";

export default function ErrorPage()
{
    const error = useRouteError();

    console.log(error);

    return (
        <div id="error-page">
            <h4>UUUPS!</h4>
            <p>Something got wrong"</p>
            <p>
                <i>{error.statustText || error.message}</i>
            </p>
        </div>
    );
}
