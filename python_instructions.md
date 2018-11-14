Run these commands from either `environment` or `neural`.

# Coverage

To get coverage reports run the following command:
```
coverage run --source=lib -m unittest && coverage report
```

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
