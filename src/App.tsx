import { useState, FormEvent } from 'react'
import './App.css'

import logoImg from './assets/logo.png'



interface infoProps {
  title: string;
  gasolina: string | number;
  alcool: string | number;
}



/* Fórmula: *alcool / gasolina
E se o resultado for menor que 0.7 compensa usar alcool
*/


function App() {

  const [gasolinaInput, setGasolinaInput] = useState(0)
  const [alcoolInput, setAlcoolInput] = useState(0)
  const [info, setInfo] = useState<infoProps>()


  /*-------------------FUNÇÕES--------------------------*/


  function calcular(event: FormEvent) {

    event.preventDefault(); //prevenir comportamento do F5, no caso

    let calculo = (alcoolInput / gasolinaInput)

    if (calculo <= 0.7) {
      setInfo({
        title: 'Compensa usar alcool!',
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      })
      // alert('compensa usar alcool')
    } else {
      setInfo({
        title: 'Compensa usar Gasolina!',
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      })
      // alert('compensa usar gasolina')
    }

  }


  /*Esta função vai converter um número pra moeda em real */

  function formatarMoeda(valor: number) {

    let valorFormatado = valor.toLocaleString('pt-br',
      {
        style: 'currency',
        currency: 'BRL',
      }
    )

    return valorFormatado;

  }
  /*Fim da função que converte moeda */


  /*-------------------FIM FUNÇÕES--------------------------*/

  return (
    <div>
      <main className='container'>

        <img className='logo'
          src={logoImg} alt="Logo Aqui" />

        <h1 className='title'>Qual a melhor opção?</h1>


        {/* --------------------PREÇO ÁLCOOL E GASOLINA --------------------- */}


        {/* No form , o evento onSubmit é um evento que acontece quanto se tenta "submter" o formulário, ou seja, por exemplo quando clica-se em um botão submit. Então você pode executar uma ou mais functions, pode fazer todas as validações que deseja */}

        {/* -------------------------------Início Formulário----------------------------- */}

        <form className='form' onSubmit={calcular}>
          <label> Álcool (Preço por litro):</label>

          <input className='input'
            type='number'
            placeholder='4,90'
            min='1' //mínimo é 1
            step='0.01' //click na setinha aumeta de 01...
            required  //tipo obrigatório
            value={alcoolInput}
            onChange={(e) => setAlcoolInput(Number(e.target.value))}
          />

          <label> Gasolina (Preço por litro):</label>

          <input className='input'
            type='number'
            placeholder='4,90'
            min='1' //mínimo é 1
            step='0.01' //click na setinha aumeta de 01...
            required  //tipo obrigatório
            value={gasolinaInput}
            onChange={(e) => setGasolinaInput(Number(e.target.value))}
          />

          <input className='button'
            type="submit"
            value={'Calcular'} /> {/*esse tipo de input é um botão */}

        </form>
        {/* -------------------------------Fim Formulário----------------------------- */}

        {/* ------------------------- FIM PREÇO ÁLCOOL E GASOLINA --------------------- */}


        {/* -------------------Resultado----------------- */}

        {/* Aqui chama-se o Objeto.keys e se faz uma resderização condicional, 
        ou seja, verifica se tem algo digitado só será mostrado o quadro verde se tiver 
        sido inserido algum valor dentro... */}

        {info && Object.keys(info).length > 0 && (

          // se info existe e se tem alguma coisa dentro dela, mostre essa section

          <section className='result'>

            <h2 className='result_title'>{info.title}</h2>

            <span>Alcool {info.alcool}</span>
            <span>Gasolina {info.gasolina}</span>

          </section>
        )}

        {/* -------------------Fim Resultado----------------- */}

      </main>


    </div>

  )
}

export default App