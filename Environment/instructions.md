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
