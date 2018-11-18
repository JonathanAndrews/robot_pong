import pandas as pd
import os

def main():
    all_hyperparameters = []
    all_attempts = [directory for directory in os.listdir('./trained_networks') if os.path.isdir(os.path.join('./trained_networks', directory))]

    for attempt in all_attempts:
        all_hyperparameters += [pd.DataFrame.from_csv('./trained_networks/' + attempt + '/hyperparameters.csv')]

    all_hyperparameters = pd.concat(all_hyperparameters, axis=0)
    all_hyperparameters.to_csv('./all_attempts.csv')
    print(all_hyperparameters)


if __name__ == '__main__':
    main()
