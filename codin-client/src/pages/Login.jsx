import React, { useState } from 'react';

export default function Login({ setToken, setSession }) {
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const body = { email, senha }

        fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then(async (res) => {
                if (res.status !== 200) {
                    console.log(res)
                    return alert('Usuário ou senha inválidos.')
                }

                const token = await res.json()

                setSession(token)
                setToken(token);
            })

    }

    return (
        <section className="vh-100">
            <div className="container-fluid h-custom mt-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <h2 className='mb-5'>
                            ProGen <br />
                            Gerenciamento de Projetos
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="email">E-mail</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="form-control form-control-lg"
                                    placeholder="E-mail" required />
                            </div>
                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="senha">Senha</label>
                                <input onChange={(e) => setSenha(e.target.value)} type="password" id="senha" className="form-control form-control-lg"
                                    placeholder="Senha" required />
                            </div>
                            <div className="d-flex flex-column text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-success btn-lg mb-1"
                                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                                    Entrar
                                </button>
                                <a href='#' className="btn btn-success btn-lg mt-1"
                                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', opacity: '70%' }}>
                                    Cadastra conta
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </section >
    )
}