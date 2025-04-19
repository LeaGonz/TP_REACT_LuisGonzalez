import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function FallBack() {
    return (
        <>

            <div className="d-flex flex-column align-items-center justify-content-center text-center min-vh-100 bg-dark text-white">
                <div className="mt-5 pt-5">
                    <h1 className="display-1">おっと！</h1>
                    <h2 className="mb-4">Página não encontrada</h2>

                    <div className="mb-4">
                        <img src="./src/assets/sushiman.png" alt="Sushiman triste" style={{ maxWidth: '50%' }} />
                    </div>

                    <p className="lead mb-4">
                        Lamentamos, mas a página que estás a procurar não existe ou foi movida.
                    </p>

                    <Link to="/">
                        <Button color="red">Início</Button>
                    </Link>

                </div>
            </div>

        </>
    )
}