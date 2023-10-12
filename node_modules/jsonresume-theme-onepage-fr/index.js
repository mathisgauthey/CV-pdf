var fs = require("fs");
var Handlebars = require("handlebars");
var moment = require('moment');

require('./moment-precise-range.js');
moment.locale('fr');

function getFormattedDate(date, date_format) {
    date_format = date_format || 'MMM YYYY';

    return moment(date).format(date_format);
}

function humanizeDuration(duration) {
   var days,
       months = duration.months(),
       years = duration.years(),
       month_str = months > 1 ? 'mois' : 'mois',
       year_str = years > 1 ? 'ans' : 'an';

    if ( months && years ) {
        return years + ' ' + year_str + ' ' + months + ' ' + month_str;
    }

    if ( months ) {
        return months + ' ' + month_str;
    }

    if ( years ) {
        return years + ' ' + year_str;
    }

    days = duration.days();

    return ( days > 1 ? days + ' jours' : days + ' jour' );
}

function getDuration(start_date, end_date, humanize) {
    var duration;

    start_date = new Date(start_date);
    end_date = new Date(end_date);
    var can_calculate_period = start_date.isValid() && end_date.isValid();

    if (!can_calculate_period) {
        return '';
    }
    duration = moment.preciseDiff(start_date, end_date);

    return (humanize ? humanizeDuration(duration) : duration);
}

COURSES_COLUMNS = 3;

PREPEND_SUMMARY_CATEGORIES = [
  "work",
  "volunteer",
  "awards",
  "publications"
];

function validateArray(arr) {
  return arr !== undefined && arr !== null && arr instanceof Array && arr.length > 0;
}

function render(resume) {
  // Split courses into 3 columns
  if (validateArray(resume.education)) {
    resume.education.forEach(function(block) {
      if (validateArray(block.courses)) {
        splitCourses = [];
        columnIndex = 0;
        for (var i = 0; i < COURSES_COLUMNS; i++) {
          splitCourses.push([]);
        }
        block.courses.forEach(function(course) {
          splitCourses[columnIndex].push(course);
          columnIndex++;
          if (columnIndex >= COURSES_COLUMNS) {
            columnIndex = 0;
          }
        });
        block.courses = splitCourses;
      }
    });
  }

  if (validateArray(resume.work)) {
    resume.work.forEach(function(block) {
      var duration;
      var start_date = moment(block.startDate, "YYYY-MM-DD");
      var end_date = block.endDate ? moment(block.endDate, "YYYY-MM-DD") : null;

      if (end_date) {
        block.endDate = getFormattedDate(end_date);
      }

      if (start_date) {
        end_date = end_date || moment();

        block.duration = moment.preciseDiff(start_date, end_date);
        block.startDate = getFormattedDate(start_date);
      }
    });
  }

  if (validateArray(resume.education)) {
    resume.education.forEach(function(block) {
      ['startDate', 'endDate'].forEach(function(type) {
        var date = block[type];

        if (date) {
          block[type] = getFormattedDate(date);
        }
      });
    });
  }

  if (validateArray(resume.awards)) {
    resume.awards.forEach(function(block) {
       var date = block.date;

       if (date) {
           block.date = getFormattedDate(date, 'DD MMM YYYY');
       }
    });
  }

  if (validateArray(resume.volunteer)) {
    resume.volunteer.forEach(function(block) {
      ['startDate', 'endDate'].forEach(function(type) {
        var date = block[type];

        if (date) {
          block[type] = getFormattedDate(date);
        }
      });
    });
  }

  if (validateArray(resume.publications)) {
    resume.publications.forEach(function(block) {
      var date = block.releaseDate;

      if (date) {
        block.releaseDate = getFormattedDate(date, 'DD MMM YYYY');
      }
    });
  }

  PREPEND_SUMMARY_CATEGORIES.forEach(function(category) {
    if (resume[category] !== undefined) {
      resume[category].forEach(function(block) {
        if (block.highlights === undefined) {
          block.highlights = [];
        }
        if (block.summary) {
          block.highlights.unshift(block.summary);
          delete block.summary;
        }
      });
    }
  });

	var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
	var tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");
	return Handlebars.compile(tpl)({
		css: css,
		resume: resume
	});
}

module.exports = {
	render: render
};
