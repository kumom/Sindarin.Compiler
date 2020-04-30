
void counter(bool c[], unsigned int n)
{
	unsigned int j=0;

	while (j<n)
	{
		if (c[j]) { c[j]=false; j++; }
		else      { c[j]=true;  j=0; }
	}
}

void sq() {   // hand-crafted squeezer
	n--;
	if (j > n) { j--; }
	c[n] = false;
}

int main(int argc, char **argv)
{
	unsigned int i=0;
	unsigned int n=atoi(argv[1]);
	bool *c = (bool *) malloc(n);

	for (i=0;i<n;i++)
	{
		assert(c[i] == 0);
	}
	counter(c,n);
	return 0;
}
