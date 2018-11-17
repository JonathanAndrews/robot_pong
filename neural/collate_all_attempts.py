import pandas as pd
import os

def main():
    all_hyperparameters = []
    all_attempts = [subdirectory[0] for subdirectory in os.walk('./trained_networks') if subdirectory[0] != './trained_networks']

    for attempt in all_attempts:
        all_hyperparameters += [pd.from_csv(attempt + '/hyperparameters.csv')]

    print(pd.concat(all_hyperparameters, axis=1)) 


if __name__ == '__main__':
    main()
