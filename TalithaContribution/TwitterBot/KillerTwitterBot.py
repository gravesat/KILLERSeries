import tweepy
import time
class TwitterAPI:
    def __init__(self):
        consumer_key = "8S8gc1wNA2jLcv3w1M1IkupRM"
        consumer_secret = "UY9spwhs2elDnvVGSeWccofIQn3IviaKiMwk76WM6qZcqZ019n"
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        access_token = "793495534115979265-62Zh91xx3QSV7kRVjKJvTU6gWEOzbKf"
        access_token_secret = "T8XGiPaLuQzNVdSwOKm6maePa4VcRLjpDHGt9aQwh4Yrq"
        auth.set_access_token(access_token, access_token_secret)
        self.api = tweepy.API(auth)

    def tweet(self, message):
        self.api.update_status(status=message)

ta = "It's almost here guys! Just 1 WEEK left until the NEW #KILLERSeries web show premieres!"
tb = "6 DAYS TO GO! We can almost taste the fear..."
tc = "5. MORE. DAYS. Can't wait any longer for some KILLER action? log on to http://killerseries.co.uk for some exclusive content."
td = "The #KILLERSeries begins in 4 DAYS! To stay updated, why not download our app 'KILLER' from the App Store."
te = "#KILLERSeries premieres in 3 DAYS on 10th December at 8PM GMT on both the app and website!"
tf = "Only 2 DAYS left until we @jointheKILLER"
tg = "TOMORROW at 8PM GMT, the KILLER slashes his way into our homes! Download the app, or watch it on http://killerseries.co.uk"
th = "THE DAY HAS FINALLY ARRIVED. #KILLERSeries premieres TONIGHT at 8PM GMT on the app and the website http://killerseries.co.uk"
ti = "If you thought it was over, be sure to check out the LIVE SHOW on 14th December on the app or website!"



tweets = [ta, tb, tc, td, te, tf, tg, th, ti];

if __name__ == "__main__":
    twitter = TwitterAPI()
    #while True:
    for i in tweets:
        print(i);
        twitter.tweet(i)
        time.sleep(86400.0);
