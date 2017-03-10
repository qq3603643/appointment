const fs = require('fs'),
	  dir_orgin  = './build/',
	  dir_target = '../appointment-backend/public/';

fs.watch(dir_orgin,
		{
			persistent: !0,
			recursive: !1
		},
		(ev, filename) =>
		{
			if(!(/(\.min\.js|\.min\.css)$/).test(filename))	return;
			console.log(`${ filename } changed: ${ ev }`);

			fs.stat(dir_orgin + filename, (err, stats) =>
			{
				if(err)
				{
					console.log(`${ filename } is moved, maybe ...`);
					fs.unlink(dir_target + filename, (err) =>
					{
						if(!err)
						{
							console.log(`${ filename } in target is removed too`)
						}
					})

					return;
				};
				var readerStream = fs.createReadStream(dir_orgin + filename),
					writerStream = fs.createWriteStream(dir_target + filename);

				readerStream.pipe(writerStream);

				writerStream.on('error', (err) =>
				{
					console.log(err);
				})

				writerStream.on('finish', () =>
				{
					console.log('transfer successly');
				})
			})
		})