import React, { Component } from 'react'
import shortid from 'shortid';
import { IListProps } from "../types/types"

export default class ListSpeech extends Component<IListProps> {
  constructor(props: IListProps) {
    super(props);
  }
  shouldComponentUpdate(nextProps: IListProps) {
    return nextProps.historyItems.length !== this.props.historyItems.length;
  }
  render() {
    return (
      this.props.historyItems.length > 0 ?
        <div>
          <p className="page-history__listTitle">История</p>
          <ul className="page-history__list">
            {

              this.props.historyItems.map(item => {
                return (
                  <li key={shortid.generate()}>
                    <div className="page-history__text">
                      {item.text}
                    </div>
                    <audio className="page-hostory__audio" controls src={item.audioSrc}></audio>
                  </li>
                )
              })
            }
          </ul>
        </div>
        : <div className="emptyPlaceholdertext">Введите текст и нажмите на ‘Получить речь’</div>
    )
  }
}
