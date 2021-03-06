import React, {useState, useMemo} from 'react'

import camera from '../../assets/camera.svg'
import './styles.css'
import api from '../../services/api'

export default function New({history}){
    const [company, setCompany] = useState('')
    const [techs, setTechs] = useState('')
    const [price, setPrice] = useState('')
    const[thumbmail, setThumbmail] = useState(null)

    const preview = useMemo(
        () => {
            return thumbmail ? URL.createObjectURL(thumbmail) : null
        }, [thumbmail]
    )

    async function handleSubmit(e){
    e.preventDefault()
      const data = new FormData()
      const user_id = localStorage.getItem('user')

      data.append('thumbmail', thumbmail)
      data.append('company', company)
      data.append('techs', techs)
      data.append('price', price)

      await api.post('spots', data, {
          headers: {user_id}
      })
      history.push('/dashboard')
    }
    return (
        <form onSubmit= {handleSubmit}>
        <label 
        id="thumbmail"
        style={{backgroundImage: `url(${preview})`}}
        className={thumbmail ? 'hass-thumbmail' : ''}
         >
        <input type="file" onChange={event => setThumbmail(event.target.files[0])}/>
        <img src={camera} alt="Select img"/>
        </label>

         <label htmlFor="company">
             EMPRESA *
         </label>
         <input
         id="company"
         placeholder="Sua empresa incrível" 
         value={company}
         onChange={event => setCompany(event.target.value)}
         >
         </input>

         <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
         <input
         id="techs"
         placeholder="Quais tecnologias usam?" 
         value={techs}
         onChange={event => setTechs(event.target.value)}
         >
         </input>

         <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para gratuito)</span></label>
         <input
         id="price"
         placeholder="Valor cobrado por dia?" 
         value={price}
         onChange={event => setPrice(event.target.value)}
         >
         </input>

         <button type="submit" className="btn">Cadastrar</button>
         
        </form>
    )
}