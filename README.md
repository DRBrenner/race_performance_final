# Final Project - Race Performance
---
### Intent

+ Determine how much race day variables factors influence race performance improvement (temp, number of racers, gender, etc.) 
+ Find correlations between individual seasonal race improvements and training log information.
+ Get the results in a format coaches and XCStat staff can view interactively without host costs (Tableau, Amazon AWS?).

### Topic

+ This is an interesting topic because many consider training hard as the best way to improve performance. My story will show other factors affecting performance.

+ Factors affecting high school cross country race performance
	-Location (elevation), course (difficulty), heat of location, allergens, goal setting, aggressiveness of goals, home school size, home school location.

### Datasets

+ Two .csv files provided by XC Stats (www.xcstats.com)
	- 577,000 rows of individual race performance statistics since 2011 including a racer id, racer school, racer gender, course id, course distance, previous course time, best course time, if a goal was set/met.
	- 1,900,000 rows of individual training logs including a racer id, date of training, effort value, and feel value.

![Results and Goals](/static/images/dataResultsGoals.png "Results and Goals Data Description")
![Training Logs](/static/images/trainingLogs.png "Training Logs Data Description")

+ Possibly add the following data from outside sources
	- lat/lon of race locations
	- average temperatures (either for cross country season or temperature on race day)
	- allergens in area (average or race day)
	- location of schools (if XC Stats will provide)

### Visualizations

+ Visualizations of factors outside a racer's control
	- bar chart winning race time (y) over years (x) for specific course
	- add male vs female to above chart
	- show school size vs top ten finishes (or school team finishes)
	- show how average temperature (during cross country season) or elevation of home school location (training ground) affects # of top ten finishes

+ Visualizations of factors within a racer's control
	- show how goal setting affects a PR
	- show agressiveness of goal affects a PR
	- show how the porportion of high-effort training days two weeks (consult a coach for predicted ideal time) before a race affects a PR

+ Dashboard inspiration: https://www.datapine.com/blog/wp-content/uploads/2018/05/customer-service-report-team.jpg