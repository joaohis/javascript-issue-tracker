function fetchIssues () {
	if (localStorage.getItem('issues') != null) {
		var issues = JSON.parse(localStorage.getItem('issues'));
		var issuesList = document.getElementById('issues');

		for (var i = 0; i < issues.length; i++) {
			renderIssue(issues[i], issuesList);
		}
	}
}

function renderIssue(issue, issuesList) {
	var id = issue.id;
	var description = issue.description;
	var severity = issue.severity;
	var assignedTo = issue.assignedTo;
	var status = issue.status;

	if (status == 'Open') {
		var statusBadge = '<span class="badge badge-warning">Open</span>';
	} else if (status == 'Closed') {
		var statusBadge = '<span class="badge badge-primary">Closed</span>';
	}

	issuesList.innerHTML +=
		'<div class="box row mb-3">' +
		'<div class="col-12">' +
		'<p>Issue ID: ' + id  + '</p>' +
		statusBadge +
		'<p>' +
		'<span class="box__title">' + description + '</span><br>' +
		'<i class="icon ion-md-alarm"></i> ' + severity + ' <i class="icon ion-md-person"></i> ' + assignedTo +
		'</p>' +
		'<a class="btn btn-success" id="close" href="#">Close</a> ' +
		'<a class="btn btn-danger" id="delete" href="#">Delete</a>' +
		'</div>' +
		'</div>';
}

document.getElementById('add-issue').addEventListener('submit', saveIssue);

function saveIssue (event) {
	var id = 1;
	var description = document.getElementById('description').value;
	var severity = document.getElementById('severity').value;
	var assignedTo = document.getElementById('assigned-to').value;
	var status = 'Open';

	var issue = {
		id: id,
		description: description,
		severity: severity,
		assignedTo, assignedTo,
		status: status
	}

	if (localStorage.getItem('issues') == null) {
		var issues = [];
	} else {
		var issues = JSON.parse(localStorage.getItem('issues'));
	}

	issues.push(issue);
	localStorage.setItem('issues', JSON.stringify(issues));

	document.getElementById('add-issue').reset();

	event.preventDefault();

	var issuesList = document.getElementById('issues');
	renderIssue(issue, issuesList);
}
