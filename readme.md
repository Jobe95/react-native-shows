# Documentation

### Implementation of AZ assignment.

Didnt have time for nice to have requirements thats why for example the heart icon does nothing on the ShowItems, same for page state variable in HomePage is not in use.

If i would to implement endless scroll i would detect when reching bottom in list & then set isLoadingMore variable & increment page variable by one until we recevive a 404.

For persistence i would convert the list to json and save in AsyncStorage, then when loading check if we have some value in storage before fetching from API.

Probably would to the same for the favorite list using AsyncStorage, parse the object to json and save it in a favorite list. Then we could go directly from favorite page/modal to detail page just passing the object.
