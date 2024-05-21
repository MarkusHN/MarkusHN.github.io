function updateTime() {
    const time = new Date().toLocaleTimeString();
    document.getElementById("Clock").innerHTML = time;
}

setInterval(updateTime, 1000);
