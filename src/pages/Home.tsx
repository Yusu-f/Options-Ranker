import React, { createRef, ReactElement } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonSelectOption,
  IonSelect,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  isPlatform,
  IonAlert,
  IonToast,
  IonMenu,
  IonList,
  IonMenuButton,
  IonButtons,
} from "@ionic/react";
import { helpCircle } from "ionicons/icons"
import axios from "axios";

import "./Home.css"

import Menu from '../components/Menu'


const dummy = [
  { ticker: "GME", expiry: "September 10, 2021", strike: 65, leverage: 500, price: 0.13, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 60, leverage: 300, price: 0.2, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 70, leverage: 1000, price: 0.07, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 55, leverage: 183.33, price: 0.3, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 50, leverage: 102.04, price: 0.49, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 60, leverage: 69.767, price: 0.86, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 65, leverage: 63.107, price: 1.03, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 45, leverage: 49.451, price: 0.91, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 55, leverage: 46.61, price: 1.18, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 70, leverage: 43.478, price: 1.61, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 65, leverage: 32.995, price: 1.97, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 65, leverage: 500, price: 0.13, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 60, leverage: 300, price: 0.2, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 70, leverage: 1000, price: 0.07, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 55, leverage: 183.33, price: 0.3, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 50, leverage: 102.04, price: 0.49, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 60, leverage: 69.767, price: 0.86, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 65, leverage: 63.107, price: 1.03, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 45, leverage: 49.451, price: 0.91, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 55, leverage: 46.61, price: 1.18, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 70, leverage: 43.478, price: 1.61, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 65, leverage: 32.995, price: 1.97, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 65, leverage: 500, price: 0.13, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 60, leverage: 300, price: 0.2, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 70, leverage: 1000, price: 0.07, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 55, leverage: 183.33, price: 0.3, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 50, leverage: 102.04, price: 0.49, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 60, leverage: 69.767, price: 0.86, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 65, leverage: 63.107, price: 1.03, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 45, leverage: 49.451, price: 0.91, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 55, leverage: 46.61, price: 1.18, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 70, leverage: 43.478, price: 1.61, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 65, leverage: 32.995, price: 1.97, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 65, leverage: 500, price: 0.13, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 60, leverage: 300, price: 0.2, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 70, leverage: 1000, price: 0.07, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 55, leverage: 183.33, price: 0.3, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 50, leverage: 102.04, price: 0.49, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 60, leverage: 69.767, price: 0.86, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 65, leverage: 63.107, price: 1.03, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 45, leverage: 49.451, price: 0.91, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 55, leverage: 46.61, price: 1.18, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 70, leverage: 43.478, price: 1.61, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 65, leverage: 32.995, price: 1.97, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 65, leverage: 500, price: 0.13, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 60, leverage: 300, price: 0.2, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 70, leverage: 1000, price: 0.07, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 55, leverage: 183.33, price: 0.3, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 50, leverage: 102.04, price: 0.49, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 60, leverage: 69.767, price: 0.86, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 65, leverage: 63.107, price: 1.03, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 45, leverage: 49.451, price: 0.91, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 55, leverage: 46.61, price: 1.18, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 70, leverage: 43.478, price: 1.61, quality: 2 },
  { ticker: "GME", expiry: "September 10, 2021", strike: 65, leverage: 32.995, price: 1.97, quality: 2 },
];


interface option {
  ticker: string;
  expiry: string;
  strike: number;
  leverage: number;
  price: number;
  quality: number
}

interface IProps { }
interface IState {
  options?: option[];
  disableInfiniteScroll: boolean;
  offset: number;
  truncatedOptions: any[];
  sortBy: string;
  showHelp: boolean;
  openToast: boolean;
  loading: boolean;
}

class HomePage extends React.Component<IProps, IState> {
  state: IState = {
    options: [],
    disableInfiniteScroll: false,
    offset: 0,
    truncatedOptions: [],
    sortBy: "quality",
    showHelp: false,
    openToast: false,
    loading: false
  };

  tickerRef = createRef<HTMLIonInputElement>();
  expiryRef = createRef<HTMLIonInputElement>();
  sortByRef = createRef<HTMLIonSelectElement>()

  crawlChainHandler = async () => {
    const ticker = this.tickerRef.current?.value;
    const expiry = this.expiryRef.current?.value;
    const sortBy = this.sortByRef.current?.value || "quality"

    const data = {
      ticker: ticker,
      expiry: expiry,
      sortBy: sortBy
    };

    this.setState({ loading: true })

    await axios
      .post("https://us-central1-optionsranker.cloudfunctions.net/fetchOptions", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.options.length == 0) {
          this.setState({ loading: false })
          this.setState({ options: dummy, openToast: true });
        } else {
          this.setState({ loading: false })
          this.setState({ options: res.data.options });
        }
      })
      .catch((err) => {
        this.setState({ loading: false })
        this.setState({ options: dummy, openToast: true });
      });
    // this.setState({ options: dummy, openToast: true });

    this.fetchData()
  };

  async searchNext(event: CustomEvent<void>) {
    await this.fetchData();

    (event.target as HTMLIonInfiniteScrollElement).complete();
  }

  fetchData() {
    console.log("fetching")
    this.setState(prevState => {
      return {
        truncatedOptions: [...prevState.truncatedOptions, ...this.state.options!.slice(prevState.offset, prevState.offset + 20)],
        offset: prevState.offset + 20
      }
    })
    if (this.state.truncatedOptions.length == this.state.options?.length) this.setState({ disableInfiniteScroll: true })
  }

  helpMessage = `
    <p>To compare multiple tickers, provide a <b>comma-separated list</b> (e.g GME, TSLA)</p>
    <p>Leverage = Strike / Price</p>
    <p>Quality = (Leverage x Time) / Moneyness</p>
    <a href="mailto:stockmentions@gmail.com">Contact us</a>    
    <br />
    <br />
    Built by <a href="https://www.upwork.com/freelancers/~0169279f54871908fd">me</a>
  `
  loading = this.state.truncatedOptions.length > 0 ? "hidden" : "block"

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton autoHide={false} menu={"first"} color="medium"></IonMenuButton>
            </IonButtons>
            <IonTitle className="ion-text-center">Options Ranker</IonTitle>
            <IonIcon icon={helpCircle} slot="end" style={{ paddingRight: "5px", cursor: "pointer" }} onClick={e => this.setState({ showHelp: true })} />
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating" style={{ color: "#918d8d" }}>
                    ticker(s)
                  </IonLabel>
                  <IonInput ref={this.tickerRef}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating" style={{ color: "#918d8d" }}>
                    expiry (days)
                  </IonLabel>
                  <IonInput ref={this.expiryRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Sort By:</IonLabel>
                  <IonSelect interface="action-sheet" value={this.state.sortBy} onIonChange={e => this.setState({ sortBy: e.detail.value })} ref={this.sortByRef}>
                    <IonSelectOption value="leverage">Leverage</IonSelectOption>
                    <IonSelectOption value="quality">Quality</IonSelectOption>
                    <IonSelectOption value="price">Price</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol>
              <IonCol size="12">
                <IonButton expand="block" onClick={this.crawlChainHandler}>
                  crawl chain
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>

          <IonToast
            isOpen={this.state.openToast}
            onDidDismiss={() => this.setState({ openToast: false })}
            message="Data has not been updated, check back by market open. This is just a placeholder."
            duration={3000}
            color="primary"
            position="bottom"
          />

          <div className={isPlatform("mobile") ? "scroll" : "dontScroll"}>
            <p className="ion-text-center" style={{ display: `${this.state.loading ? "block" : "none"}` }}>Loading...</p>
            {this.state.truncatedOptions?.map((option, index) => {
              return (
                <IonCard key={index} style={{ marginRight: "4px", marginLeft: "4px", paddingRight: "4px", width: `${isPlatform("mobile") ? "600px" : "100%"}` }}>
                  <IonCardContent style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                    <IonGrid className="ion-no-padding">
                      <IonRow>
                        <IonCol>
                          <div className="ion-text-center">
                            <p>TICKER</p>
                            <b>{option.ticker}</b>
                          </div>
                        </IonCol>
                        <IonCol>
                          <div className="ion-text-center">
                            <p>EXPIRY</p>
                            <b>{option.expiry}</b>
                          </div>
                        </IonCol>
                        <IonCol>
                          <div className="ion-text-center">
                            <p>STRIKE</p>
                            <b>{option.strike}</b>
                          </div>
                        </IonCol>
                        <IonCol>
                          <div className="ion-text-center">
                            <p>LEVERAGE</p>
                            <b>{option.leverage}</b>
                          </div>
                        </IonCol>
                        <IonCol>
                          <div className="ion-text-center">
                            <p>PRICE</p>
                            <b>{option.price}</b>
                          </div>
                        </IonCol>
                        <IonCol>
                          <div className="ion-text-center">
                            <p>QUALITY</p>
                            <b>{option.quality}</b>
                          </div>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              );
            })}
          </div>
          <IonAlert
            isOpen={this.state.showHelp}
            onDidDismiss={() => this.setState({ showHelp: false })}
            header={'Help & Info'}
            message={this.helpMessage}
            cssClass='my-custom-class'
          />

          <IonInfiniteScroll
            threshold="100px"
            disabled={this.state.disableInfiniteScroll}
            onIonInfinite={(e: CustomEvent<void>) => this.searchNext(e)}
          >
            <IonInfiniteScrollContent loadingText="Loading..."></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonContent>
      </IonPage>
    );
  }
}

export default HomePage;
