
## TCP Problems with Android Studio 
### Presentation of the problem
Some ptoblem may arise when try to lanuch the project in developpement mode. A lingering emulator may go on and off (namely emulator-5562) even when the emulator server is turned on and off using the following command :
```bash
adb kill-server 
adb start serverd
```
When checking to se the list of emulator, (emulator-5562) will cerntainly appears as offline but this then makes the machine actively refused the connection (for unknown reasons). 
```bash 
# Show the emulators and connected devices
adb devices
```

### Solution found 
The way to bypass this problem is to first use the following command to first find what is used in the port and then kill the .exe that is using the port before building the project. 
The following commands need to be used in the powershell as administrator.
```bash
abd devices #See of the emulator is offline
netstat -ano | findstr :[port + 1] # the port which is used by the emulator + 1
taskkill /pid [pid] /F #Terminated using the pid of the task that is using the port

```