Run these commands from either `environment` or `neural`.

# Coverage

To get coverage reports run the following command:
```
coverage run --source=lib -m unittest && coverage report
```

To get readable reports run:
```
coverage html -d coverage_html
```
and then open `coverage_html/index.html` in the browser.

# Linting

To lint run:

```
pylint simple lib
```

# Generating requirements
```
pip freeze > requirements.txt
```

# Installing requirements
```
pip install -r requirements.txt
```

# Installing the right python version
```
brew unlink python
brew install https://raw.githubusercontent.com/Homebrew/homebrew-core/f2a764ef944b1080be64bd88dca9a1d80130c558/Formula/python.rb
```

# Loading hyperparameter dictionaries

We can use ipython to view the hyperparameter (cool word) dictionaries which are stored during the training sessions.
These hyperparameter dictionaries are just fancy post it notes (I think we should still use post it notes though).

Follow these steps in ipython to view the hyperparameter at location `trained_networks/2018-11-17_15:24:24`:

```
>    import pickle
>    DIRECTORY = 'trained_networks/2018-11-17_15:24:24/'
>    with open(DIRECTORY + 'hyperparameters.pickle', 'rb') as source:
...:     hyperparameters = pickle.load(source)
...:
>    hyperparameters
```
The last line will display the hyperparameter dictionary.

# Viewing all attempted parameter sets

```
> python collate_all_attempts.py
``` 
