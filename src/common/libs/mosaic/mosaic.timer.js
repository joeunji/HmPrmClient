
class Timer
{
	constructor()
	{
	}
}

class TimerMgr
{
	mIntInterval = 1000;
	mObjTickHandler = null;
	mIntTimerId = 0;

	constructor()
	{
	}

	setInterval(intInterval)
	{
		this.mIntInterval = intInterval;
	};

	addTickHandler(objTickHandler)
	{
		this.mObjTickHandler = objTickHandler;
	};

	start()
	{
		var objMe = this;
		if(this.mIntTimerId > 0) window.clearInterval(this.mIntTimerId);
		this.mIntTimerId = window.setInterval(function () { objMe.mObjTickHandler(); }, this.mIntInterval);
	};

	stop()
	{
		window.clearInterval(this.mIntTimerId);
	}
}

Timer.TimerMgr = TimerMgr;
export default Timer;


