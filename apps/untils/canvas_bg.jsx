import React from 'react';

// 绘制圆的的个数
const COUNT_CIRCLE = 60,
	  WIDTH  = Math.max(window.screen.width * .8, window.innerWidth),
      HEIGHT = Math.max(window.screen.height * .8, window.innerHeight);

let timerId_canvas = null;

class CanvasBodyBackground extends React.Component
{
	constructor(props)
	{
	  super(props);
	  this.state =
	  {
	  	canvas: null,
	  	context: null,
	  	circle_collections: new Array
	  };
	}
	componentDidMount()
	{
		this.initCanvas();

		timerId_canvas =
		setInterval(() =>
			{
			    const { context } = this.state;

				if(!context) return;
				context.clearRect(0, 0, canvas.width, canvas.height);

				// 更新坐标
				this.updateCirclePos();

				//重新渲染
				this.createCircle();
				this.createLine();
			}, 16)
	}
	componentWillUnmount()
	{
		clearInterval(timerId_canvas)
	}
	line(x, y, _x, _y, o)              /* 开始坐标x,y 结束坐标_x,_y 线条透明度 o **/
	{
		return Object.assign({},
		{
			beginX: x,
			beginY: y,
			closeX: _x,
			closeY: _y,
			opacity: o
		})
	}
	circle(x, y, r, movex, movey)          /* 圆的坐标x,y 半径r 每次移动的距离 **/
	{
		return Object.assign({},
		{
			x,
			y,
			r,
			movex,
			movey
		})
	}
	num(max, min = 0)                      /* min~max 之间的随机数 **/
	{
		return min + Math.floor((max - min + 1) * Math.random());
	}
	drawCricle(cxt, x, y, r) /* 坐标x,y 半径r 移动的距离x,y **/
	{
		cxt.beginPath();
		cxt.arc(x, y, r, 0, 2*Math.PI);
		cxt.closePath();
		cxt.fill();
	}
	drawLine(cxt, x, y, _x, _y, o)
	{
		let line = this.line(x, y, _x, _y, o);

			cxt.beginPath();
			cxt.strokeStyle = 'rgba(0,0,0,'+ o +')';
			cxt.moveTo(line.beginX, line.beginY);
			cxt.lineTo(line.closeX, line.closeY);
			cxt.closePath();
			cxt.stroke();
	}
	initCirlcePos()
	{
		let i = 0,
		    { circle_collections } = this.state;

	    while(i < COUNT_CIRCLE)
    	{
    		circle_collections.push(
				this.circle(
						this.num(WIDTH),
						this.num(HEIGHT),
						this.num(15, 2),
						this.num(10, -10)/40,
						this.num(10, -10)/40
					)
    			);

			i ++;
    	}
	}
	updateCirclePos()
	{
		let { circle_collections } = this.state;

		circle_collections.forEach(circle_item =>
		{
			circle_item.x += circle_item.movex;
			circle_item.y += circle_item.movey;

			if(circle_item.x > WIDTH)  circle_item.x = 0;
			if(circle_item.y > HEIGHT) circle_item.y = 0;
			if(circle_item.x < 0)      circle_item.x = WIDTH;
			if(circle_item.y < 0)	   circle_item.y = HEIGHT;
		})
	}
	createCircle()
	{
		let drawCricle = this.drawCricle,
			{ context, circle_collections } = this.state;

		circle_collections.forEach(circle_item =>
		{
			drawCricle(
				context,
				circle_item.x,
				circle_item.y,
				circle_item.r
				)
		}, )
	}
	createLine()     /* 连接index相加小于COUNT_CIRCLE的两个circle **/
	{
		let { context, circle_collections } = this.state;

		for (let i = 0; i < COUNT_CIRCLE; i++)
		{
			for (let j = 0; j < COUNT_CIRCLE; j++)
			{
				if (i + j < COUNT_CIRCLE)
				{
					let A = Math.abs(circle_collections[i+j].x - circle_collections[i].x),
						B = Math.abs(circle_collections[i+j].y - circle_collections[i].y);
					let lineLength = Math.sqrt(A*A + B*B);
					let C = 1/lineLength*7-0.009;
					let lineOpacity = C > 0.03 ? 0.03 : C;
					if (lineOpacity > 0)
					{
						this.drawLine(context, circle_collections[i].x, circle_collections[i].y, circle_collections[i+j].x, circle_collections[i+j].y, lineOpacity);
					}
				}
			}
		}
	}
	initCanvas()
	{
	    const canvas  = this.refs.canvas,
    		  context = canvas.getContext('2d');

		/* canvas style **/
		canvas.width  = WIDTH;
		canvas.height = HEIGHT;
	    context.strokeStyle = 'rgba(0,0,0,0.02)',
		context.strokeWidth = 1,
		context.fillStyle = 'rgba(0,0,0,0.05)';
		/* set canvas && set context to state **/
		this.setState(
		{
			canvas,
			context
		});

		setTimeout(() =>
			{
				this.initCirlcePos();
				this.createCircle();
				this.createLine();
			}, 0);
	}
	render()
	{
		return (
				<canvas id="canvas" ref="canvas"></canvas>
			);
	}
}

export default CanvasBodyBackground;
