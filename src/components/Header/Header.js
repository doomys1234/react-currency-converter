
import s from './Header.module.scss'
export default function Header({usdRate,eurRate}) {
    
    return (
        <header className={s.header_container}>
            <h1 className={s.header_title}>Converter App</h1>
            <div className={s.rate_container}>
  <p className={s.rate_text}>Today's Rate:</p>
  <div>
                    <span className={s.rate_value}>EUR: {eurRate}</span>
                    <span className={s.rate_value}>USD: {usdRate}</span>
  </div>
            </div>
            </header>
)
}