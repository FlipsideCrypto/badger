from django.db import models

"""

Table --- Rows --- Columns

a table is a collection of rows and columns

a row is a collection of columns

a column is a collection of rows (???)

a row may or may not have data for every column

a row should be able to have its full stack pulled in one query 
    -- column specifity will be a rare need and we are already data-dense in transfer

to filter to a columns values one would do row.column_set.filter(column__name='name')
"""

class Column(models.Model):
    TYPE_CHOICES = (
        ('text', 'Text'),
        ('number', 'Number'),
    )

    name = models.CharField(max_length=100) 
    type = models.CharField(max_length=100, choices=TYPE_CHOICES)

 
class Row(models.Model):
    column = models.ForeignKey(Column, on_delete=models.CASCADE)


class Table(models.Model):
    organization = models.ForeignKey('Organization', on_delete=models.CASCADE)
    badge = models.ForeignKey('Badge', on_delete=models.CASCADE)

    # global state of table -- all rows have every column they just may not have data in that column
    columns = models.ManyToManyField(Column)
    rows = models.ManyToManyField(Row)