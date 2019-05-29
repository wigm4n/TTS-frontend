import React, { Component } from 'react'
import { IHistoryListItem, russianChars, englishChars } from "../types/types"
import ListSpeech from './ListSpeech';

interface ISpeechState {
  historyItems: IHistoryListItem[]
  term: string,
  requestPending: boolean
}

class Speech extends Component<any, ISpeechState> {
  constructor(props: any) {
    super(props);
    this.state = {
      historyItems: [],
      term: "",
      requestPending: false
    };
    this.appendItem = this.appendItem.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputKeyPressed = this.onInputKeyPressed.bind(this);
  }
  appendItem = () => {
    const term = this.state.term;
    if (term && term.length < 200 && term.replace(/\s/g, '').length) {
      if (!this.state.requestPending) {
        this.setState({ term: "", requestPending: true });
        const input: any = document.querySelector(".input");
        if (input) { input.focus() }
        const request: any = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: "POST",
          mode: 'cors',
          body: JSON.stringify({ input: term })
        };
        fetch("backend/get_audio", request)
          .then(response => response.blob())
          .then(blob => {
            let blobUrl: string = URL.createObjectURL(blob);
            this.setState(state => {
              const historyItems: IHistoryListItem[] = state.historyItems ? [{ text: term, audioSrc: blobUrl }, ...state.historyItems] : [{ text: term, audioSrc: blobUrl }]
              return {
                historyItems,
                requestPending: false
              };
            });
          });
      } else alert("Дождитесь ответа");
    } else alert("Введите текст для озвучки (не более 200 символов)");
  }
  onInputChange(event: any) {
    let currentValue = event.target.value;
    currentValue = currentValue.replace(/[^A-Za-zа-яА-Я0-9,.?!-@$%();:+='<>€\]\["/\/*{}| ]/g, '');

    let currentValueArr = currentValue.split('');
    currentValueArr = currentValueArr.map((char: string, index: number) => {
      const isUpperCase: boolean = char === char.toLocaleUpperCase();
      const indexOfEnglish = englishChars.indexOf(char.toLocaleLowerCase());
      if (indexOfEnglish >= 0) {
        return isUpperCase ? russianChars[indexOfEnglish].toLocaleUpperCase() : russianChars[indexOfEnglish];
      } return char;
    });
    currentValue = currentValueArr.join('');
    this.setState({ term: currentValue });
  }

  onInputKeyPressed(event: any) {
    if (event.key === "Enter" && this.state.term.length) {
      var buttonSubmit: HTMLElement = document.querySelector("button[type='submit']") as HTMLElement;
      buttonSubmit.click();
    }
  }
  render() {
    return (
      <main className="page-content">
        <section className="page-input">
          <input className="input" type="text" placeholder="Введите ваш текст..." value={this.state.term} onKeyPress={this.onInputKeyPressed} onChange={this.onInputChange} />
          <button type="submit" onClick={this.appendItem}>Получить речь</button>
        </section>
        <section className="page-history">
          <ListSpeech historyItems={this.state.historyItems} />
        </section>
      </main>
    )
  }
}

export default Speech;