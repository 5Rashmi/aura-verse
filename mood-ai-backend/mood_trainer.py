import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import pickle

df = pd.read_csv("mood_dataset.csv")

# convert text into numbers
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(df["text"])

# count the numbers
y = df["mood"]
model = MultinomialNB()
model.fit(X, y)

# sample test
sample = vectorizer.transform(["I feel like crying"])
print(model.predict(sample))

# save
pickle.dump(model, open("model.pkl", "wb"))
pickle.dump(vectorizer, open("vectorizer.pkl", "wb"))