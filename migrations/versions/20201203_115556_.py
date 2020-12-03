"""empty message

Revision ID: 9d52466a5279
Revises: 0c57b9f5a0e4
Create Date: 2020-12-03 11:55:56.344413

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '9d52466a5279'
down_revision = '0c57b9f5a0e4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('tagId', sa.Integer(), nullable=False),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['tagId'], ['tags.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('userTags')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('userTags',
    sa.Column('id', sa.INTEGER(), server_default=sa.text('nextval(\'"userTags_id_seq"\'::regclass)'), autoincrement=True, nullable=False),
    sa.Column('userId', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('tagId', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('created_on', postgresql.TIMESTAMP(), server_default=sa.text('now()'), autoincrement=False, nullable=True),
    sa.Column('updated_on', postgresql.TIMESTAMP(), server_default=sa.text('now()'), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['tagId'], ['tags.id'], name='userTags_tagId_fkey'),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], name='userTags_userId_fkey'),
    sa.PrimaryKeyConstraint('id', name='userTags_pkey')
    )
    op.drop_table('user_tags')
    # ### end Alembic commands ###
