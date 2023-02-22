export default function Landing() {
    const goToLogin = () => {
        return window.location.replace('/login')
    }

    return (
        <section className="vh-100 m-2">
            <nav className="navbar navbar-expand-lg m-3">
                <a className="navbar-brand" href="#">ProGen</a>
                <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav my-2 my-lg-0 ">
                        <li className="nav-item">
                            <a onClick={goToLogin} className="nav-link" href="#">Login</a>
                        </li>
                        <li className="nav-item">
                            <a onClick={goToLogin} className="nav-link btn btn-outline-success" href="#">
                                <span className="text-success">
                                    Cadastrar
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <div className="d-flex flex-column text-center text-lg-start mt-4 pt-2">
                            <h2 className="mb-4">
                                <b>
                                    Bem-vindo ao ProGen <br />
                                    Gerenciador de Processos
                                </b>
                            </h2>
                            <p>
                                A PGE atualmente se encontra no seguimento de modernização de seus
                                fluxos de processos. Surge a necessidade de criação de uma aplicação com
                                enfoque em revigorar a agilidade do trabalho para os servidores públicos.
                            </p>
                            <p>
                                Esta aplicação consiste em um pequena aplicação web para gerenciamento de
                                processos judiciais. Nela, irão existir três tipos de caixas que representam a
                                localização dos processos.
                            </p>
                            <button type="submit" className="btn btn-success btn-lg mb-1" onClick={goToLogin}
                                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', marginTop: '1rem' }}>
                                Entrar
                            </button>
                            <a href='#' className="btn btn-success btn-lg mt-1" onClick={goToLogin}
                                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', opacity: '70%' }}>
                                Cadastrar conta
                            </a>
                        </div>
                    </div>
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid"
                            alt="Sample image" />
                    </div>
                </div>
            </div >
        </section >
    )
}