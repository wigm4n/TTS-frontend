import React from 'react'
import SpeechSection from './SpeechSection';

interface IProps { name?: string; }
interface IState { name: string }

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: this.props.name || "default name"
    }
  }
  render() {
    return (
      <div className="main-wrapper">
        <header className="page-header">
          <h1>Синтез речи на русском языке</h1>
        </header>
        <SpeechSection />
        <footer className="page-footer-wrapper">
          <div className="page-footer">
            <div><a href="https://github.com/wigm4n/TTS-backend/wiki/Описание-работы-API">Описание работы API</a></div>
            <div>НИУ ВШЭ 2019</div>
            <div>GitHub: <a href="https://github.com/wigm4n">wigm4n</a></div>
          </div>
        </footer>
      </div>
    )
  }
}

export default App;
