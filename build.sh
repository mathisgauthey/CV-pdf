#!/bin/bash

resume export index --format html --theme onepage-fr

# Start Firefox with the profile you created for printing
firefox -P "default" "file:///home/mathis/documents/CV-pdf/index.html" &

xdotool search --sync --onlyvisible --name "Mathis Gauthey" windowactivate --sync key ctrl+p

sleep 1

xdotool key Tab
xdotool key Tab
xdotool key Tab
xdotool key Tab
xdotool KP_Enter

sleep 1
xdotool key KP_Enter
sleep 1
xdotool key KP_Enter

# Close the print dialog (You might need to adjust the delay)
sleep 2
xdotool key Escape

# Close Firefox
sleep 1
xdotool key ctrl+q

mv mozilla.pdf GAUTHEY_Mathis.pdf